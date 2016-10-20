var roleMover = {

    /** @param {Creep} creep **/
    run: function(creep, spawn_container, controller_container,current_room,spawn_container_d, spawn_link, controller_link) {
        // if energy is lying around take it and move it somewhere
        console.log(spawn_link!=0 && spawn_link.energy < spawn_link.energyCapacity)
        var dropped_energy = creep.room.find(FIND_DROPPED_ENERGY);
        console.log("here")
        if(dropped_energy.length > 0 && creep.carry.energy<creep.carryCapacity){
            if(creep.pickup(dropped_energy[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(dropped_energy[0]);
            }
        }
        // if no energy is lying around, take some energy from the spawn container
        else if(dropped_energy.length == 0 && creep.carry.energy<creep.carryCapacity && spawn_container.length != 0){

            if(creep.withdraw(spawn_container[0], "energy") == ERR_NOT_IN_RANGE) {
                creep.moveTo(spawn_container[0]);
            }
        }

        else if(dropped_energy.length == 0 && spawn_container.length == 0 && creep.carry.energy<creep.carryCapacity){

            if(creep.withdraw(current_room.storage, "energy") == ERR_NOT_IN_RANGE) {
                creep.moveTo(current_room.storage);
            }
        }

        else{
        // if there is a spawn drop off and no control container go to spawn drop off
        if (spawn_container_d.length>0 && controller_container.length==0){
            drop_off = spawn_container_d[0]
        }
        // if there is no span pickup or controll container use the spawn as drop of point
        else if (spawn_container.length==0 && controller_container.length==0 && spawn_link==null){

            var drop_off = Game.spawns.Spawn1
        }
        else if (spawn_link!=0 && spawn_link.energy < spawn_link.energyCapacity){
            var drop_off = spawn_link
        }
        // if there is a controll container drop of energy there
        else{
            var drop_off = controller_container[0];
        }
        console.log(drop_off)
        if(creep.carry.energy>0.9*creep.carryCapacity){

            if(creep.transfer(drop_off, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(drop_off);
            }
        }
        }}
};

module.exports = roleMover;
