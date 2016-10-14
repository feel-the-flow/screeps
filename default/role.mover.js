var roleMover = {

    /** @param {Creep} creep **/
    run: function(creep, spawn_container, controller_container) {
        var dropped_energy = creep.room.find(FIND_DROPPED_ENERGY);
        if(dropped_energy.length > 10 && creep.carry.energy<creep.carryCapacity){
            if(creep.pickup(dropped_energy[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(dropped_energy[0]);
            }
        }
        if(dropped_energy.length < 10 && creep.carry.energy<creep.carryCapacity){
            if(creep.withdraw(spawn_container[0], "energy") == ERR_NOT_IN_RANGE) {
                creep.moveTo(spawn_container[0]);
            }
        }
        else{
            if(creep.transfer(controller_container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(controller_container);
            }
        }
    }
};

module.exports = roleMover;
