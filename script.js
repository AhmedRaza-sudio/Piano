
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        let audioCtx;

        // Synthesizer Settings
        let volume = 0.4;
        const waveforms = ['triangle', 'sine', 'sawtooth', 'square'];
        let waveIndex = 0;
        let sustainTime = 1.2;
        let isMouseDown = false;

        const display = document.getElementById('note-display');
        const noteNames = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

        // Map keys in chronological musical order (C3 = MIDI 48)
        const allKeys = [];
        let midiNote = 48;

        document.querySelectorAll('.key-out').forEach(whiteKey => {
            allKeys.push({ element: whiteKey, midi: midiNote++ });
            const blackKey = whiteKey.querySelector('.key-in');
            if (blackKey) {
                allKeys.push({ element: blackKey, midi: midiNote++ });
            }
        });

        // Sound Generator
        function playNote(keyObj) {
            if (!audioCtx) audioCtx = new AudioContext();
            if (audioCtx.state === 'suspended') audioCtx.resume();

            const freq = 440 * Math.pow(2, (keyObj.midi - 69) / 12);
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();

            osc.type = waveforms[waveIndex];
            osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

            // Smooth attack and decay envelope
            gain.gain.setValueAtTime(0.001, audioCtx.currentTime);
            gain.gain.exponentialRampToValueAtTime(volume, audioCtx.currentTime + 0.02);
            gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + sustainTime);

            osc.connect(gain);
            gain.connect(audioCtx.destination);

            osc.start();
            osc.stop(audioCtx.currentTime + sustainTime);

            // Visual press effect & LCD updatejhhhhh
            keyObj.element.classList.add('active');
            setTimeout(() => keyObj.element.classList.remove('active'), 150);

            const noteName = noteNames[keyObj.midi % 12] + (Math.floor(keyObj.midi / 12) - 1);
            display.textContent = `NOTE: ${noteName} • ${Math.round(freq)} Hz`;
        }

        // Mouse Click & Drag Glissando Support
        document.addEventListener('mousedown', () => isMouseDown = true);
        document.addEventListener('mouseup', () => isMouseDown = false);

        allKeys.forEach(keyObj => {
            keyObj.element.addEventListener('mousedown', (e) => {
                e.stopPropagation(); // Prevents black key clicks from triggering the white key underneath
                playNote(keyObj);
            });

            keyObj.element.addEventListener('mouseenter', (e) => {
                if (isMouseDown) {
                    e.stopPropagation();
                    playNote(keyObj);
                }
            });
        });

        // Computer Keyboard Mapping (Middle Octave: A S D F G H J + W E T Y U)
        const keyboardMap = {
            'a': 12, 'w': 13, 's': 14, 'e': 15, 'd': 16, 'f': 17,
            't': 18, 'g': 19, 'y': 20, 'h': 21, 'u': 22, 'j': 23, 'k': 24
        };

        document.addEventListener('keydown', (e) => {
            if (e.repeat) return;
            const index = keyboardMap[e.key.toLowerCase()];
            if (index !== undefined && allKeys[index]) {
                playNote(allKeys[index]);
            }
        });

        // Interactive Knobs
        document.getElementById('vol-knob').addEventListener('click', function () {
            volume = volume >= 0.7 ? 0.15 : +(volume + 0.15).toFixed(2);
            this.style.transform = `rotate(${(volume * 300) - 120}deg)`;
            display.textContent = `VOLUME: ${Math.round((volume / 0.75) * 100)}%`;
        });

        document.getElementById('wave-knob').addEventListener('click', function () {
            waveIndex = (waveIndex + 1) % waveforms.length;
            this.style.transform = `rotate(${waveIndex * 90 - 90}deg)`;
            display.textContent = `TONE: ${waveforms[waveIndex].toUpperCase()}`;
        });

        document.getElementById('sustain-knob').addEventListener('click', function () {
            sustainTime = sustainTime === 1.2 ? 2.8 : 1.2;
            this.style.transform = `rotate(${sustainTime > 1.2 ? 60 : -60}deg)`;
            display.textContent = `SUSTAIN: ${sustainTime > 1.2 ? 'LONG' : 'NORMAL'}`;
        });
