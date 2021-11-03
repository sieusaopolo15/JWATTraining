const PC = function({ ram, hdd, name, mainboard, chip, VGA }) {
    this.ram = ram || 0;
    this.hdd = hdd || 0;
    this.name = name || '';
    this.mainboard = mainboard || '';
    this.chip = chip || '';
    this.VGA = VGA || ''
  };
  module.exports = PC;