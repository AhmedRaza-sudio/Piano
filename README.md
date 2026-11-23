# 🎹 Luxury Synthesizer Piano (`𝓛𝓪𝓶𝓫𝓸𝓻𝓰𝓱𝓲𝓷𝓲®`)

An interactive browser-based synthesizer piano built with **HTML5**, **CSS3**, and **Vanilla JavaScript (Web Audio API)**. It features a dark metallic hardware chassis, perforated speaker grilles, an LCD note readout, interactive control knobs, and zero external audio files or dependencies.

## ✨ Features

* **Zero-Dependency Sound Engine:** Uses the browser's built-in **Web Audio API** to synthesize notes from **C3** to **B5** using standard 12-tone equal temperament tuning ($f = 440 \times 2^{(n-69)/12}$).
* **Multiple Playing Modes:**
  * Click or tap individual white and black keys.
  * Hold mouse down and drag across keys for glissandos.
  * Play the middle octave using your computer keyboard (`A`–`K` for natural notes, `W`, `E`, `T`, `Y`, `U` for sharps).
* **Interactive Console Controls:**
  * **Vol:** Cycles through volume levels and updates the knob angle.
  * **Tone:** Switches oscillator waveforms (`triangle`, `sine`, `sawtooth`, `square`).
  * **Sustain:** Toggles between normal and extended note decay.
* **Live LCD Readout:** Displays active note names (e.g., `C4`, `F#4`), frequencies in Hz, and control changes.
* **Luxury Hardware Styling:** Styled with a brushed dark metallic finish, crimson felt keybed trim, speaker grilles, and active key press animations.

## 🚀 Getting Started

1. Clone or download this repository:
   ```bash
   git clone [https://github.com/your-username/luxury-synthesizer-piano.git](https://github.com/your-username/luxury-synthesizer-piano.git)
