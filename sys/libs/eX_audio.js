function eX_initAudioSystem() {
    eX_sysAudioContext   = new AudioContext();
    eX_sysAudioGain      = eX_sysAudioContext.createGain();
    eX_sysAudioGain.gain.value = 0.5;
    eX_sysAudioGain.connect(eX_sysAudioContext.destination);
}

function eX_addAudioSource(src) {
    var audioSource    = eX_sysAudioContext.createMediaElementSource(src);
    var audioAnalyser1 = eX_sysAudioContext.createAnalyser();
    var audioAnalyser2 = eX_sysAudioContext.createAnalyser();
    var audioGain      = eX_sysAudioContext.createGain();

    audioSource.connect(audioAnalyser1);
    audioSource.connect(audioAnalyser2);
    audioAnalyser1.fftSize = 128;
    audioAnalyser2.fftSize = 128;
    audioAnalyser1.smoothingTimeConstant = 0.3;
    audioAnalyser2.smoothingTimeConstant = 0.9;
    audioAnalyser1.connect(audioGain);
    audioAnalyser2.connect(audioGain);
    audioGain.gain.value = 0.5;
    audioGain.connect(eX_sysAudioGain);

    var audioData = {
        source:    audioSource,
        gainNode:  audioGain,
        analyser1: audioAnalyser1,
        analyser2: audioAnalyser2
    };

    return audioData;
}

function eX_setSysVol(level) {
    eX_sysAudioGain.gain.value = (level + 120) * 0.004166667;
}

function eX_seek(src, x) {
    src.currentTime = x;
}

function eX_startAudioVisualization(element, width, height, audioAnalyser1, audioAnalyser2) {
    scene  = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(45, width / height, 1, 100);

    camera.position.set(0, 0, 50);
    camera.lookAt(scene.position);
    scene.add(camera);

    renderer = new THREE.WebGLRenderer({alpha:true, antialias:true});

    renderer.setSize(width, height);
    element.appendChild(renderer.domElement);

    bars = new Array(new Array(40), new Array(40), new Array(40));

    var j = -50.0;
    for (var i = 0; i < 64; i++) {
        bars[2][i] = new THREE.Mesh(new THREE.PlaneBufferGeometry(0.2, 0.5), new THREE.MeshBasicMaterial({color:0x9F42C2})); //Wave
        bars[1][i] = new THREE.Mesh(new THREE.PlaneBufferGeometry(0.2, 0.5), new THREE.MeshBasicMaterial({color:0x55B25B})); //Bars
        bars[0][i] = new THREE.Mesh(new THREE.PlaneBufferGeometry(0.2, 0.5), new THREE.MeshBasicMaterial({color:0xFF7446})); //Tips
        bars[2][i].position.set(j, 10, 0);
        bars[1][i].position.set(j, -20.5, 0);
        bars[0][i].position.set(j, -20.5, 0);
        j += (0.7 * 2);
        scene.add(bars[1][i]);
        scene.add(bars[0][i]);
        scene.add(bars[2][i])
    }
    visualData = new Array(new Uint8Array(128), new Uint8Array(64), new Uint8Array(64));
    eX_visualize(audioAnalyser1, audioAnalyser2);
}

function eX_visualize(audioAnalyser1, audioAnalyser2) {
    audioAnalyser2.getByteTimeDomainData(visualData[2]);
    audioAnalyser2.getByteFrequencyData(visualData[0]);
    audioAnalyser1.getByteFrequencyData(visualData[1]);
    var data;
    for (var i = 0; i < 64; i++) {
        bars[2][i].position.y = ((visualData[2][i] - 128) / 5) + 10;
        data = (visualData[1][i] / 8);
        bars[1][i].position.y = (data / 4) - 20.5;
        bars[1][i].scale.y = data;
        bars[0][i].position.y = ((visualData[0][i] / 8) / 2) - 20.5;
        if (bars[0][i].scale.y === 0)
            bars[0][i].scale.y = 0.1;
        if (bars[1][i].scale.y === 0)
            bars[1][i].scale.y = 0.1;
        if (bars[2][i].scale.y === 0)
            bars[2][i].scale.y = 0.1;
    }
    setTimeout(requestAnimationFrame(function () {eX_visualize(audioAnalyser1, audioAnalyser2)}));
    renderer.render(scene, camera);
}
