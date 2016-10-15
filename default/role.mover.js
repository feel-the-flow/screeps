var roleMover = {

    /** @param {Creep} creep **/
    run: function(creep, spawn_container, controller_container,current_room) {
        var dropped_energy = creep.room.find(FIND_DROPPED_ENERGY);
        if(dropped_energy.length > 0 && creep.carry.energy<creep.carryCapacity){
            if(creep.pickup(dropped_energy[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(dropped_energy[0]);
            }
        }
        if(dropped_energy.length == 0 && creep.carry.energy<creep.carryCapacity){
            if(creep.withdraw(spawn_container[0], "energy") == ERR_NOT_IN_RANGE) {
                creep.moveTo(spawn_container[0]);
            }
        }
        if(controller_container.store[RESOURCE_ENERGY]==controller_container.storeCapacity){
            var drop_off = current_room.storage;
        }
        else{
            var drop_off = controller_container;
        }
        if(creep.carry.energy>0.9*creep.carryCapacity){
            if(creep.transfer(drop_off, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(drop_off);
            }
        }
    }
};

module.exports = roleMover;
