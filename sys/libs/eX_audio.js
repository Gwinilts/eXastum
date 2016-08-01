function eX_initAudioSystem() {
    eX_sysAudioContext   = new AudioContext();
    eX_sysAudioAnalyser  = eX_sysAudioContext.createAnalyser();
    eX_sysAudioAnalyser2 = eX_sysAudioContext.createAnalyser();
    eX_sysAudioGain      = eX_sysAudioContext.createGain();
    eX_sysAudioGain.gain.value   = 0.5;
    eX_sysAudioAnalyser.fftSize  = 128;
    eX_sysAudioAnalyser2.fftSize = 128;
    eX_sysAudioAnalyser.smoothingTimeConstant  = 0.3;
    eX_sysAudioAnalyser2.smoothingTimeConstant = 0.9;
    eX_sysAudioAnalyser.connect(eX_sysAudioGain);
    eX_sysAudioAnalyser2.connect(eX_sysAudioGain);
    eX_sysAudioGain.connect(eX_sysAudioContext.destination);
}

function eX_addAudioSource(src) {
    var audioSource = eX_sysAudioContext.createMediaElementSource(src);
    audioSource.connect(eX_sysAudioAnalyser);
    audioSource.connect(eX_sysAudioAnalyser2);
}

function eX_setSysVol(level) {
    eX_sysAudioGain.gain.value = (level + 120) * 0.004166667;
}

function eX_seek(src, x) {
    src.currentTime = x;
}

function eX_startAudioVisualization(element, width, height) {
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
    eX_visualize();
}

function eX_visualize() {
    eX_sysAudioAnalyser2.getByteTimeDomainData(visualData[2]);
    eX_sysAudioAnalyser2.getByteFrequencyData(visualData[0]);
    eX_sysAudioAnalyser.getByteFrequencyData(visualData[1]);
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
    setTimeout(requestAnimationFrame(eX_visualize));
    renderer.render(scene, camera);
}
