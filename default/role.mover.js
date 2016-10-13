var roleMover = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if(creep.carry.energy < creep.carryCapacity*0.25) {
            var dropped_energy = creep.room.find(FIND_DROPPED_ENERGY);

            if(creep.pickup(dropped_energy[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(dropped_energy[0]);
            }
        }
        else {
            var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_SPAWN||structure.structureType == STRUCTURE_EXTENSION) &&
                            structure.energy < structure.energyCapacity;
                    }
            });
            var targets2 = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_CONTAINER) &&
                            structure.store[RESOURCE_ENERGY] < structure.storeCapacity;
                    }
            });
            var tower = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_TOWER) &&
                            structure.energy < structure.energyCapacity*0.5;
                    }
            });
            if(targets.length > 0) {
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0]);
                }
            }
            if(tower.length > 0) {
                if(creep.transfer(tower[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(tower[0]);
                }
            }
            if(targets2.length > 0 && targets.length==0 && tower.length==0) {
                if(creep.transfer(targets2[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets2[0]);
                }
            }
        }
    }
};

module.exports = roleMover;
