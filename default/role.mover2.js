var roleMover2 = {

    /** @param {Creep} creep **/
    run: function(creep, room_source_container, spawn_container_d, current_room)
    {

        if (creep.carry.energy==0 && current_room.energyAvailable < current_room.energyCapacityAvailable && current_room.storage.store[RESOURCE_ENERGY] > 5000){
            if(creep.withdraw(current_room.storage, "energy") == ERR_NOT_IN_RANGE) {
                creep.moveTo(current_room.storage);
            }
        }
    else {
        // pick up resources from different locations
        if(creep.carry.energy<creep.carryCapacity*0.25){
            var container =Game.getObjectById( room_source_container[creep.memory.source])
            var dropped_energy = creep.room.find(FIND_DROPPED_ENERGY);

            if(creep.withdraw(container, "energy") == ERR_NOT_IN_RANGE) {
                creep.moveTo(container);
            }
            // if no container present, pick up dropped energy
            else if(container==null || container.store[RESOURCE_ENERGY]==0){
            if (creep.pickup(dropped_energy[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(dropped_energy[0]);
            }
        }
        }
        // if we have enough resources drop of resources at different locations
        else {
            // drop of spawn container
            var targets2 = spawn_container_d;
            // drop of at spawn or extensions that have less energy than capacity
            var targets = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_SPAWN||
                            structure.structureType == STRUCTURE_EXTENSION) &&
                            structure.energy < structure.energyCapacity;
                    }
            });
            // drop of points for towers
            var tower = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_TOWER) &&
                            structure.energy < structure.energyCapacity*0.5;
                    }
            });
            // now priority building first fill up any spawn like structures
            if(targets) {
                if(creep.transfer(targets, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets);
                }
            }
            // fill up tower
            else if(tower.length > 0) {
                if(creep.transfer(tower[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(tower[0]);
                }
            }
            // fill up spawn containers
            else if(targets2.length > 0 && !targets && tower.length==0) {
                if(creep.transfer(targets2[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets2[0]);
                }
            }
            // fill up storage if present
            else if(targets2.length == 0 && !targets && tower.length==0) {
                if(creep.transfer(current_room.storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(current_room.storage);
                }
            }
        }
    }
    }
};

module.exports = roleMover2;
