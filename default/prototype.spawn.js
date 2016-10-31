module.exports = function() {
    // create a new function for StructureSpawn
    StructureSpawn.prototype.createMoverCreep =
        function(energy, roleName, source) {
            // create a balanced body as big as possible with the given energy

            var numberOfParts = Math.floor(energy / 100);
            var body = [];
            for (let i = 0; i < numberOfParts; i++) {
                body.push(CARRY);
            }
            for (let i = 0; i < numberOfParts; i++) {
                body.push(MOVE);
            }

            // create creep with the created body and the given role
            return this.createCreep(body, undefined, { role: roleName, source: source });
        };
        StructureSpawn.prototype.createHarvesterCreep =

            function(energy, roleName, source) {
                // create a balanced body as big as possible with the given energy
                if (energy > 550){
                    var body = [WORK,WORK,WORK,WORK,WORK,MOVE]
                }
                else{
                var numberOfWorkParts = Math.floor(energy/100);
                if (energy%100 == 0){
                    var numberOfWorkParts = numberOfWorkParts - 1;
                    var numberOfMoveParts = 2
                }
                else {
                    var numberOfMoveParts = 1
                }
                var body = [];
                for (let i = 0; i < numberOfWorkParts; i++) {
                    body.push(WORK);
                }
                for (let i = 0; i < numberOfMoveParts; i++) {
                    body.push(MOVE);
                }
                }
                // create creep with the created body and the given role
                return this.createCreep(body, undefined, { role: roleName, source: source });
            };
        StructureSpawn.prototype.createCustomCreep =
            function(energy, roleName) {
                // create a balanced body as big as possible with the given energy
                var numberOfParts = Math.floor(energy / 200);
                var body = [];
                for (let i = 0; i < numberOfParts; i++) {
                    body.push(WORK);
                }
                for (let i = 0; i < numberOfParts; i++) {
                    body.push(CARRY);
                }
                for (let i = 0; i < numberOfParts; i++) {
                    body.push(MOVE);
                }
                if ((energy%200)==100){
                    body.push(WORK);
                }
                // create creep with the created body and the given role
                return this.createCreep(body, undefined, { role: roleName});
    };


};
