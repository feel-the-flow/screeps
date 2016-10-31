
var roomStructures = {
    run: function(current_room) {
        // are source container available
        var sources = current_room.find(FIND_SOURCES);
        room_source_container = []
        for(i=0; i<sources.length;i++){
            var container = sources[i].pos.findInRange(FIND_STRUCTURES, 1, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_CONTAINER);
                    }
            })
            if (container.length > 0){
                room_source_container.push(container[0].id)
            }
        }
        current_room.memory.source_containers = room_source_container;
        // is a spawn container available
        var container = Game.spawns.Spawn1.pos.findInRange(FIND_STRUCTURES, 2, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_CONTAINER);
                }
        })
        if (container.length > 0){
        current_room.memory.spawn_container = container[0].id;
    }
        // is a storage available
        // is a controller container available
        // is a tower available
        // is a spawn link available
        // is a controller link available
    }
};
module.exports = roomStructures;
