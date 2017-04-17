function Sound(options){
  // options: inputCount
  var context = new window.AudioContext(); // define audio context

  function beep(options){
    // options: frequency, wave, gain, duration
    
    var gain = context.createGain()
    
    gain.connect(context.destination)
    gain.gain.value = options.gain
    
    var osc = context.createOscillator();
    osc.frequency.value = options.frequency
    osc.type = options.wave
    osc.connect(gain)
    
    osc.start()
    osc.stop(context.currentTime + options.duration)
  }

  return {
    context : context,
    beep: beep
  }
}