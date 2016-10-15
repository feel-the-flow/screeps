var roleHarvester = require('role.harvester');
var runHarvest = {
    run: function(current_room, room_source_container) {
            var sources = current_room.find(FIND_SOURCES)

            for(i=0; i<sources.length;i++){
                var h = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester'
                && creep.memory.source==i);
                if(h.length<1){
                    var newName = Game.spawns['Spawn1'].createCreep(
                        [WORK,WORK,WORK,WORK,WORK,WORK,
                            CARRY,CARRY,CARRY,
                            CARRY,CARRY,CARRY,CARRY,CARRY,
                            MOVE,MOVE,MOVE,MOVE,MOVE,MOVE],
                        undefined, {role: 'harvester',source: i});
                }
                for(var c in h){
                roleHarvester.run(h[c],room_source_container);
                }
                //console.log('Harvester source ' + i + ' assinged creeps '+h.length);
            }
        }
}
module.exports = runHarvest;
