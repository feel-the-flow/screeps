var roleHarvester = require('role.harvester');
var runHarvest = {
    run: function(current_room, room_source_container) {
        var energy = Game.spawns.Spawn1.room.energyCapacityAvailable;

        var total_harvesters = _.filter(Game.creeps, (creep) => creep.memory.role =='harvester');
        if (current_room.energyAvailable < 301 && total_harvesters.length==0){
            var newName = Game.spawns.Spawn1.createHarvesterCreep(300, 'harvester', 0);
        }
            var sources = current_room.find(FIND_SOURCES)
            var energy_avail = current_room.energyAvailable
            if (energy_avail<550){
                var min_harvesters = 2
            }
            else{
                var min_harvesters = 1
            }
            for(i=0; i<sources.length;i++){
                var h = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester'
                && creep.memory.source==i);
                console.log("harvesters for source " + i + " " + h)
                if(h.length<min_harvesters){
                    var newName = Game.spawns.Spawn1.createHarvesterCreep(energy, 'harvester', i);
                }
                for(var c in h){

                roleHarvester.run(h[c],room_source_container);
                }
                //console.log('Harvester source ' + i + ' assinged creeps '+h.length);
            }
        }
}
module.exports = runHarvest;
