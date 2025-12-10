// ==========================================
// MINI-GAMES - Interactive Challenges
// ==========================================

// Game State Manager
const gameManager = {
    currentGame: null,

    openGame(gameName) {
        // Close any open game
        if (this.currentGame) {
            document.getElementById(`${this.currentGame}-game`).classList.remove('active');
        }

        // Open selected game
        this.currentGame = gameName;
        const gameContainer = document.getElementById(`${gameName}-game`);
        gameContainer.classList.add('active');

        // Initialize the game
        switch (gameName) {
            case 'sorting':
                sortingGame.init();
                break;
            case 'memory':
                memoryGame.init();
                break;
            case 'typing':
                typingGame.init();
                break;
        }
    },

    closeGame(gameName) {
        document.getElementById(`${gameName}-game`).classList.remove('active');
        this.currentGame = null;
    }
};

// Global function for HTML onclick
function openGame(gameName) {
    gameManager.openGame(gameName);
}

// ==========================================
// GAME 1: SORTING ALGORITHM VISUALIZER
// ==========================================
const sortingGame = {
    array: [],
    arraySize: 30,
    speed: 50,
    isRunning: false,

    init() {
        const container = document.getElementById('sorting-game');
        container.innerHTML = `
            <div style="text-align: center;">
                <h3 style="color: var(--color-primary-gold); margin-bottom: 1rem;">
                    🔄 Visualizador de Algoritmos de Ordenamiento
                </h3>
                <p style="margin-bottom: 1rem;">Observa cómo funcionan diferentes algoritmos</p>
                
                <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; margin-bottom: 1rem;">
                    <button class="btn btn-primary" onclick="sortingGame.bubbleSort()">
                        Bubble Sort
                    </button>
                    <button class="btn btn-primary" onclick="sortingGame.selectionSort()">
                        Selection Sort
                    </button>
                    <button class="btn btn-secondary" onclick="sortingGame.generateArray()">
                        Nuevo Array
                    </button>
                </div>
                
                <div id="sorting-bars" style="display: flex; align-items: flex-end; justify-content: center; height: 300px; gap: 2px; margin-top: 2rem;">
                </div>
                
                <div id="sorting-info" style="margin-top: 1rem; color: var(--color-accent-gold);">
                    <p>Comparaciones: <span id="comparisons">0</span> | Intercambios: <span id="swaps">0</span></p>
                </div>
            </div>
        `;

        this.generateArray();
    },

    generateArray() {
        this.array = [];
        for (let i = 0; i < this.arraySize; i++) {
            this.array.push(Math.floor(Math.random() * 250) + 10);
        }
        this.renderArray();
        this.resetStats();
    },

    renderArray(highlightIndices = []) {
        const container = document.getElementById('sorting-bars');
        container.innerHTML = '';

        this.array.forEach((value, index) => {
            const bar = document.createElement('div');
            bar.style.cssText = `
                height: ${value}px;
                width: ${100 / this.arraySize}%;
                background: ${highlightIndices.includes(index) ?
                    'var(--color-accent-gold)' :
                    'linear-gradient(180deg, var(--color-primary-gold), var(--color-deep-gold))'};
                border-radius: 4px 4px 0 0;
                transition: all 0.2s ease;
                box-shadow: ${highlightIndices.includes(index) ? 'var(--glow-gold)' : 'none'};
            `;
            container.appendChild(bar);
        });
    },

    resetStats() {
        document.getElementById('comparisons').textContent = '0';
        document.getElementById('swaps').textContent = '0';
    },

    async bubbleSort() {
        if (this.isRunning) return;
        this.isRunning = true;
        this.resetStats();

        let comparisons = 0;
        let swaps = 0;
        const n = this.array.length;

        for (let i = 0; i < n - 1; i++) {
            for (let j = 0; j < n - i - 1; j++) {
                comparisons++;
                document.getElementById('comparisons').textContent = comparisons;

                this.renderArray([j, j + 1]);
                await this.sleep(this.speed);

                if (this.array[j] > this.array[j + 1]) {
                    [this.array[j], this.array[j + 1]] = [this.array[j + 1], this.array[j]];
                    swaps++;
                    document.getElementById('swaps').textContent = swaps;
                    this.renderArray([j, j + 1]);
                    await this.sleep(this.speed);
                }
            }
        }

        this.renderArray();
        this.isRunning = false;
    },

    async selectionSort() {
        if (this.isRunning) return;
        this.isRunning = true;
        this.resetStats();

        let comparisons = 0;
        let swaps = 0;
        const n = this.array.length;

        for (let i = 0; i < n - 1; i++) {
            let minIdx = i;

            for (let j = i + 1; j < n; j++) {
                comparisons++;
                document.getElementById('comparisons').textContent = comparisons;

                this.renderArray([minIdx, j]);
                await this.sleep(this.speed);

                if (this.array[j] < this.array[minIdx]) {
                    minIdx = j;
                }
            }

            if (minIdx !== i) {
                [this.array[i], this.array[minIdx]] = [this.array[minIdx], this.array[i]];
                swaps++;
                document.getElementById('swaps').textContent = swaps;
                this.renderArray([i, minIdx]);
                await this.sleep(this.speed);
            }
        }

        this.renderArray();
        this.isRunning = false;
    },

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
};

// ==========================================
// GAME 2: MEMORY MATRIX
// ==========================================
const memoryGame = {
    gridSize: 4,
    level: 1,
    pattern: [],
    userPattern: [],
    isShowingPattern: false,

    init() {
        const container = document.getElementById('memory-game');
        container.innerHTML = `
            <div style="text-align: center;">
                <h3 style="color: var(--color-primary-gold); margin-bottom: 1rem;">
                    🧠 Juego de Memoria - Matrix
                </h3>
                <p style="margin-bottom: 1rem;">Memoriza el patrón y reprodúcelo</p>
                
                <div style="margin-bottom: 1rem;">
                    <p style="color: var(--color-accent-gold); font-size: 1.2rem; font-weight: 600;">
                        Nivel: <span id="memory-level">1</span>
                    </p>
                </div>
                
                <div id="memory-grid" style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; max-width: 400px; margin: 0 auto 1rem;">
                </div>
                
                <button class="btn btn-primary" onclick="memoryGame.startLevel()">
                    Comenzar Nivel
                </button>
                
                <div id="memory-message" style="margin-top: 1rem; min-height: 30px; color: var(--color-white);">
                    Presiona "Comenzar Nivel" para empezar
                </div>
            </div>
        `;

        this.createGrid();
    },

    createGrid() {
        const grid = document.getElementById('memory-grid');
        grid.innerHTML = '';

        for (let i = 0; i < this.gridSize * this.gridSize; i++) {
            const cell = document.createElement('div');
            cell.dataset.index = i;
            cell.style.cssText = `
                aspect-ratio: 1;
                background: var(--color-glass-overlay);
                border: 2px solid var(--color-glass-border);
                border-radius: 10px;
                cursor: pointer;
                transition: all 0.3s ease;
            `;

            cell.addEventListener('click', () => this.cellClicked(i));
            grid.appendChild(cell);
        }
    },

    async startLevel() {
        if (this.isShowingPattern) return;

        this.pattern = [];
        this.userPattern = [];
        this.isShowingPattern = true;

        document.getElementById('memory-message').textContent = 'Observa el patrón...';

        // Generate pattern
        const patternLength = 3 + this.level;
        for (let i = 0; i < patternLength; i++) {
            this.pattern.push(Math.floor(Math.random() * (this.gridSize * this.gridSize)));
        }

        // Show pattern
        await this.sleep(1000);
        for (const index of this.pattern) {
            await this.highlightCell(index, 600);
            await this.sleep(200);
        }

        this.isShowingPattern = false;
        document.getElementById('memory-message').textContent = 'Tu turno! Repite el patrón';
    },

    async highlightCell(index, duration) {
        const cells = document.querySelectorAll('#memory-grid div');
        const cell = cells[index];

        cell.style.background = 'var(--gradient-gold)';
        cell.style.boxShadow = 'var(--glow-gold-strong)';
        cell.style.transform = 'scale(1.1)';

        await this.sleep(duration);

        cell.style.background = 'var(--color-glass-overlay)';
        cell.style.boxShadow = 'none';
        cell.style.transform = 'scale(1)';
    },

    async cellClicked(index) {
        if (this.isShowingPattern) return;

        await this.highlightCell(index, 200);
        this.userPattern.push(index);

        // Check if correct
        const currentStep = this.userPattern.length - 1;

        if (this.userPattern[currentStep] !== this.pattern[currentStep]) {
            document.getElementById('memory-message').innerHTML = `
                <span style="color: #ff4444;">❌ Incorrecto! Inténtalo de nuevo</span>
            `;
            this.level = Math.max(1, this.level - 1);
            document.getElementById('memory-level').textContent = this.level;
            await this.sleep(1500);
            this.startLevel();
            return;
        }

        // Check if pattern complete
        if (this.userPattern.length === this.pattern.length) {
            this.level++;
            document.getElementById('memory-level').textContent = this.level;
            document.getElementById('memory-message').innerHTML = `
                <span style="color: var(--color-primary-gold);">✅ ¡Correcto! Nivel ${this.level}</span>
            `;
            await this.sleep(1500);
            this.startLevel();
        }
    },

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
};

// ==========================================
// GAME 3: CODE TYPING CHALLENGE
// ==========================================
const typingGame = {
    codeSnippets: [
        'function fibonacci(n) { return n <= 1 ? n : fibonacci(n-1) + fibonacci(n-2); }',
        'const quickSort = arr => arr.length <= 1 ? arr : quickSort(arr.filter(x => x < arr[0])).concat(arr[0], quickSort(arr.filter(x => x > arr[0])));',
        'class Node { constructor(data) { this.data = data; this.next = null; } }',
        'const binarySearch = (arr, target, low = 0, high = arr.length - 1) => { if (low > high) return -1; const mid = Math.floor((low + high) / 2); return arr[mid] === target ? mid : arr[mid] > target ? binarySearch(arr, target, low, mid - 1) : binarySearch(arr, target, mid + 1, high); };',
        'def merge_sort(arr): if len(arr) <= 1: return arr; mid = len(arr) // 2; return merge(merge_sort(arr[:mid]), merge_sort(arr[mid:]))'
    ],
    currentSnippet: '',
    startTime: null,
    isPlaying: false,

    init() {
        const container = document.getElementById('typing-game');
        container.innerHTML = `
            <div style="text-align: center;">
                <h3 style="color: var(--color-primary-gold); margin-bottom: 1rem;">
                    ⌨️ Desafío de Velocidad de Código
                </h3>
                <p style="margin-bottom: 1rem;">Escribe el código lo más rápido que puedas</p>
                
                <div id="typing-snippet" style="background: rgba(10, 10, 10, 0.8); padding: 1.5rem; border-radius: 10px; margin-bottom: 1rem; font-family: 'Courier New', monospace; text-align: left; overflow-x: auto; border: 2px solid var(--color-glass-border);">
                </div>
                
                <textarea id="typing-input" 
                    style="width: 100%; min-height: 100px; padding: 1rem; border-radius: 10px; background: var(--color-glass-overlay); border: 2px solid var(--color-glass-border); color: var(--color-white); font-family: 'Courier New', monospace; font-size: 0.95rem; resize: vertical;"
                    placeholder="Empieza a escribir aquí..."></textarea>
                
                <div style="margin-top: 1rem; display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
                    <button class="btn btn-primary" onclick="typingGame.startGame()">
                        Nuevo Desafío
                    </button>
                    <button class="btn btn-secondary" onclick="typingGame.resetGame()">
                        Reiniciar
                    </button>
                </div>
                
                <div id="typing-stats" style="margin-top: 1.5rem; display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 1rem;">
                    <div class="glass-card">
                        <p style="color: var(--color-accent-gold); font-size: 0.9rem;">Tiempo</p>
                        <p id="typing-time" style="font-size: 1.5rem; font-weight: 600; color: var(--color-primary-gold);">0s</p>
                    </div>
                    <div class="glass-card">
                        <p style="color: var(--color-accent-gold); font-size: 0.9rem;">Precisión</p>
                        <p id="typing-accuracy" style="font-size: 1.5rem; font-weight: 600; color: var(--color-primary-gold);">100%</p>
                    </div>
                    <div class="glass-card">
                        <p style="color: var(--color-accent-gold); font-size: 0.9rem;">WPM</p>
                        <p id="typing-wpm" style="font-size: 1.5rem; font-weight: 600; color: var(--color-primary-gold);">0</p>
                    </div>
                </div>
            </div>
        `;

        this.startGame();
    },

    startGame() {
        this.currentSnippet = this.codeSnippets[Math.floor(Math.random() * this.codeSnippets.length)];
        this.displaySnippet();

        const input = document.getElementById('typing-input');
        input.value = '';
        input.disabled = false;
        input.focus();

        this.startTime = null;
        this.isPlaying = false;

        // Reset stats
        document.getElementById('typing-time').textContent = '0s';
        document.getElementById('typing-accuracy').textContent = '100%';
        document.getElementById('typing-wpm').textContent = '0';

        // Add input listener
        input.oninput = () => this.checkProgress();
    },

    displaySnippet() {
        const container = document.getElementById('typing-snippet');
        container.innerHTML = '';

        this.currentSnippet.split('').forEach(char => {
            const span = document.createElement('span');
            span.textContent = char;
            span.style.color = 'var(--color-off-white)';
            container.appendChild(span);
        });
    },

    checkProgress() {
        if (!this.startTime) {
            this.startTime = Date.now();
            this.isPlaying = true;
            this.updateTimer();
        }

        const input = document.getElementById('typing-input');
        const userText = input.value;
        const spans = document.querySelectorAll('#typing-snippet span');

        let correct = 0;
        let incorrect = 0;

        spans.forEach((span, index) => {
            if (index < userText.length) {
                if (userText[index] === this.currentSnippet[index]) {
                    span.style.color = 'var(--color-primary-gold)';
                    span.style.textShadow = '0 0 5px rgba(255, 215, 0, 0.5)';
                    correct++;
                } else {
                    span.style.color = '#ff4444';
                    span.style.textShadow = '0 0 5px rgba(255, 68, 68, 0.5)';
                    incorrect++;
                }
            } else {
                span.style.color = 'var(--color-off-white)';
                span.style.textShadow = 'none';
            }
        });

        // Update accuracy
        const accuracy = userText.length > 0 ? (correct / userText.length * 100).toFixed(1) : 100;
        document.getElementById('typing-accuracy').textContent = accuracy + '%';

        // Check if complete
        if (userText === this.currentSnippet) {
            this.completeGame();
        }
    },

    updateTimer() {
        if (!this.isPlaying) return;

        const elapsed = ((Date.now() - this.startTime) / 1000).toFixed(1);
        document.getElementById('typing-time').textContent = elapsed + 's';

        // Calculate WPM
        const input = document.getElementById('typing-input');
        const words = input.value.trim().split(/\s+/).length;
        const minutes = elapsed / 60;
        const wpm = minutes > 0 ? Math.round(words / minutes) : 0;
        document.getElementById('typing-wpm').textContent = wpm;

        requestAnimationFrame(() => this.updateTimer());
    },

    completeGame() {
        this.isPlaying = false;
        const input = document.getElementById('typing-input');
        input.disabled = true;

        const time = document.getElementById('typing-time').textContent;
        const accuracy = document.getElementById('typing-accuracy').textContent;
        const wpm = document.getElementById('typing-wpm').textContent;

        setTimeout(() => {
            alert(`🎉 ¡Completado!\n\nTiempo: ${time}\nPrecisión: ${accuracy}\nWPM: ${wpm}\n\n¡Excelente trabajo!`);
        }, 100);
    },

    resetGame() {
        this.startGame();
    }
};
