document.addEventListener('DOMContentLoaded', function() {
    // Initialisation des fonctionnalités principales
    initDatePicker();
    initDragAndDrop();
    initTooltips();
    enhanceUIExperience();

    // Convertir les dates pour le formulaire (timestamp -> date)
    function initDatePicker() {
        const dueDateInput = document.getElementById('dueDate');

        if (dueDateInput) {
            dueDateInput.addEventListener('change', function() {
                const date = new Date(this.value);
                if (!isNaN(date.getTime())) {
                    // Créer un champ caché pour stocker le timestamp EPOCH
                    let hiddenInput = document.getElementById('dueDateEpoch');
                    if (!hiddenInput) {
                        hiddenInput = document.createElement('input');
                        hiddenInput.type = 'hidden';
                        hiddenInput.name = 'dueDate';
                        hiddenInput.id = 'dueDateEpoch';
                        dueDateInput.parentNode.appendChild(hiddenInput);
                        // Changer le nom du champ date visible pour éviter les doublons
                        dueDateInput.name = 'dueDateDisplay';
                    }

                    // Convertir la date en timestamp EPOCH en millisecondes
                    hiddenInput.value = date.getTime();
                }
            });

            // Si l'input a déjà une valeur, créer le champ caché
            if (dueDateInput.value) {
                const date = new Date(dueDateInput.value);
                if (!isNaN(date.getTime())) {
                    let hiddenInput = document.getElementById('dueDateEpoch');
                    if (!hiddenInput) {
                        hiddenInput = document.createElement('input');
                        hiddenInput.type = 'hidden';
                        hiddenInput.name = 'dueDate';
                        hiddenInput.id = 'dueDateEpoch';
                        dueDateInput.parentNode.appendChild(hiddenInput);
                        dueDateInput.name = 'dueDateDisplay';
                    }
                    hiddenInput.value = date.getTime();
                }
            }
        }
    }

    // Implémentation du drag-and-drop style Trello pour les tâches
    function initDragAndDrop() {
        const taskCards = document.querySelectorAll('.task-card');
        const columns = document.querySelectorAll('[id^="column-"]');

        if (taskCards.length > 0 && columns.length > 0) {
            // Configuration du drag & drop pour chaque tâche
            taskCards.forEach(card => {
                card.setAttribute('draggable', 'true');

                card.addEventListener('dragstart', function(e) {
                    e.dataTransfer.setData('text/plain', this.dataset.id);
                    this.classList.add('is-dragging');

                    // Amélioration de l'apparence pendant le déplacement
                    this.classList.add('opacity-70', 'scale-105');

                    // Changer le curseur
                    document.body.style.cursor = 'grabbing';
                });

                card.addEventListener('dragend', function() {
                    this.classList.remove('is-dragging', 'opacity-70', 'scale-105');
                    document.body.style.cursor = '';
                });
            });

            // Configuration des colonnes pour recevoir les tâches
            columns.forEach(column => {
                column.addEventListener('dragover', function(e) {
                    e.preventDefault();
                    this.classList.add('is-over', 'bg-opacity-70');

                    // Effet de surlignage
                    const taskCards = this.querySelectorAll('.task-card:not(.is-dragging)');
                    taskCards.forEach(card => card.style.opacity = '0.6');
                });

                column.addEventListener('dragleave', function() {
                    this.classList.remove('is-over', 'bg-opacity-70');

                    // Réinitialiser l'opacité
                    const taskCards = this.querySelectorAll('.task-card');
                    taskCards.forEach(card => card.style.opacity = '');
                });

                column.addEventListener('drop', async function(e) {
                    e.preventDefault();
                    this.classList.remove('is-over', 'bg-opacity-70');

                    // Réinitialiser l'opacité
                    const taskCards = this.querySelectorAll('.task-card');
                    taskCards.forEach(card => card.style.opacity = '');

                    const taskId = e.dataTransfer.getData('text/plain');
                    const newStatus = this.dataset.status;

                    // Trouver la carte de tâche
                    const taskCard = document.querySelector(`.task-card[data-id="${taskId}"]`);

                    if (taskCard && taskCard.dataset.status !== newStatus) {
                        try {
                            // Animation pendant le chargement
                            taskCard.classList.add('animate-pulse');

                            // Appel API pour mettre à jour le statut
                            const response = await fetch(`/tasks/${taskId}/status`, {
                                method: 'PUT',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({ status: newStatus }),
                            });

                            // Fin de l'animation de chargement
                            taskCard.classList.remove('animate-pulse');

                            if (response.ok) {
                                // Animation de déplacement
                                const oldColumn = taskCard.parentElement;

                                // Animation de sortie
                                taskCard.classList.add('scale-95', 'opacity-50');

                                // Déplacer la carte
                                this.appendChild(taskCard);
                                taskCard.dataset.status = newStatus;

                                // Animation d'entrée
                                setTimeout(() => {
                                    taskCard.classList.remove('scale-95', 'opacity-50');
                                    taskCard.classList.add('scale-100', 'opacity-100');
                                }, 50);

                                // Mettre à jour les compteurs de tâches
                                updateTaskCounters(oldColumn, this);

                                // Afficher un message de succès
                                showNotification(`Tâche déplacée vers ${getStatusName(newStatus)}`, 'success');
                            } else {
                                const errorData = await response.json();
                                showNotification(errorData.error || 'Une erreur est survenue', 'error');
                            }
                        } catch (error) {
                            console.error('Erreur lors du déplacement de la tâche:', error);
                            showNotification('Une erreur est survenue lors du déplacement de la tâche', 'error');
                            taskCard.classList.remove('animate-pulse');
                        }
                    }
                });
            });
        }
    }

    // Initialisation des info-bulles
    function initTooltips() {
        const tooltipTriggers = document.querySelectorAll('[data-tooltip]');

        tooltipTriggers.forEach(trigger => {
            const tooltipText = trigger.getAttribute('data-tooltip');

            // Créer l'élément info-bulle
            const tooltip = document.createElement('div');
            tooltip.classList.add('tooltip', 'hidden', 'absolute', 'z-50', 'bg-gray-800', 'text-white', 'text-xs', 'rounded', 'py-1', 'px-2', 'opacity-0', 'transition-opacity');
            tooltip.textContent = tooltipText;

            // Ajouter l'info-bulle au document
            document.body.appendChild(tooltip);

            // Afficher l'info-bulle au survol
            trigger.addEventListener('mouseenter', () => {
                const rect = trigger.getBoundingClientRect();
                tooltip.style.top = `${rect.bottom + window.scrollY + 5}px`;
                tooltip.style.left = `${rect.left + window.scrollX + (rect.width / 2) - (tooltip.offsetWidth / 2)}px`;
                tooltip.classList.remove('hidden', 'opacity-0');
                tooltip.classList.add('opacity-100');
            });

            // Masquer l'info-bulle
            trigger.addEventListener('mouseleave', () => {
                tooltip.classList.remove('opacity-100');
                tooltip.classList.add('opacity-0');
                setTimeout(() => {
                    tooltip.classList.add('hidden');
                }, 200);
            });
        });
    }

    // Améliorations générales de l'interface
    function enhanceUIExperience() {
        // Surbrillance des éléments au survol
        const interactiveElements = document.querySelectorAll('a, button, .task-card');

        interactiveElements.forEach(element => {
            if (element.classList.contains('task-card')) {
                // Les cartes ont déjà des styles hover
                return;
            }

            element.addEventListener('mouseenter', () => {
                element.classList.add('transition-colors');
            });
        });

        // Vérifier les dates limites dépassées
        const taskDates = document.querySelectorAll('.task-card [data-due-date]');

        taskDates.forEach(dateElement => {
            const timestamp = dateElement.getAttribute('data-due-date');
            if (timestamp) {
                const dueDate = new Date(Number(timestamp));
                const today = new Date();

                // Réinitialiser les heures pour comparer uniquement les dates
                today.setHours(0, 0, 0, 0);
                dueDate.setHours(0, 0, 0, 0);

                if (dueDate < today) {
                    // Date dépassée
                    dateElement.classList.add('text-red-600', 'font-medium');

                    // Ajouter une icône d'avertissement
                    const warningIcon = document.createElement('span');
                    warningIcon.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 inline-block ml-1 text-red-600" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
            </svg>
          `;
                    dateElement.appendChild(warningIcon);
                } else if (dueDate.getTime() === today.getTime()) {
                    // Aujourd'hui
                    dateElement.classList.add('text-yellow-600', 'font-medium');
                }
            }
        });
    }

    // Mettre à jour les compteurs de tâches dans les en-têtes de colonnes
    function updateTaskCounters(oldColumn, newColumn) {
        if (oldColumn && newColumn) {
            // Mettre à jour le compteur de l'ancienne colonne
            const oldHeader = oldColumn.previousElementSibling.querySelector('span:last-child');
            if (oldHeader) {
                const oldCount = oldColumn.querySelectorAll('.task-card').length;
                oldHeader.textContent = `(${oldCount})`;
            }

            // Mettre à jour le compteur de la nouvelle colonne
            const newHeader = newColumn.previousElementSibling.querySelector('span:last-child');
            if (newHeader) {
                const newCount = newColumn.querySelectorAll('.task-card').length;
                newHeader.textContent = `(${newCount})`;
            }
        }
    }

    // Obtenir le nom lisible d'un statut
    function getStatusName(status) {
        const statusNames = {
            'A_FAIRE': 'À faire',
            'EN_COURS': 'En cours',
            'EN_REVISION': 'En révision',
            'TERMINEE': 'Terminée',
        };

        return statusNames[status] || status;
    }

    // Afficher une notification
    function showNotification(message, type = 'info') {
        // Vérifier si une notification existe déjà
        let notification = document.querySelector('.notification');

        if (!notification) {
            // Créer une nouvelle notification
            notification = document.createElement('div');
            notification.classList.add('notification', 'fixed', 'bottom-4', 'right-4', 'px-4', 'py-3', 'rounded-lg', 'shadow-lg', 'flex', 'items-center', 'transform', 'transition-all', 'duration-300', 'z-50');
            document.body.appendChild(notification);
        }

        // Définir la couleur selon le type
        notification.className = 'notification fixed bottom-4 right-4 px-4 py-3 rounded-lg shadow-lg flex items-center transform transition-all duration-300 z-50';

        switch (type) {
            case 'success':
                notification.classList.add('bg-green-100', 'text-green-800', 'border-l-4', 'border-green-500');
                break;
            case 'error':
                notification.classList.add('bg-red-100', 'text-red-800', 'border-l-4', 'border-red-500');
                break;
            default:
                notification.classList.add('bg-blue-100', 'text-blue-800', 'border-l-4', 'border-blue-500');
                break;
        }

        // Ajouter le message
        notification.innerHTML = `
      <div class="flex items-center">
        <div class="text-sm font-medium">${message}</div>
      </div>
      <button class="ml-4 text-gray-400 hover:text-gray-600 focus:outline-none" onclick="this.parentElement.remove()">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
        </svg>
      </button>
    `;

        // Afficher l'animation d'entrée
        setTimeout(() => {
            notification.classList.add('translate-y-0', 'opacity-100');
            notification.classList.remove('translate-y-4', 'opacity-0');
        }, 1);

        // Disparition automatique après 5 secondes
        setTimeout(() => {
            if (notification && notification.parentElement) {
                notification.classList.add('translate-y-4', 'opacity-0');
                setTimeout(() => {
                    if (notification && notification.parentElement) {
                        notification.remove();
                    }
                }, 300);
            }
        }, 5000);
    }

    // Formater les dates dans un format lisible
    window.formatDate = function(timestamp) {
        if (!timestamp) return '';

        const date = new Date(Number(timestamp));
        return date.toLocaleDateString('fr-FR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    };

    // Convertir les timestamps en dates pour les afficher dans les formulaires
    window.formatDateForInput = function(timestamp) {
        if (!timestamp) return '';

        const date = new Date(Number(timestamp));
        return date.toISOString().split('T')[0];
    };
});