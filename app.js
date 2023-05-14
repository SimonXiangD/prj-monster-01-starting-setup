function getRandomInt(min, ranExpo) {
    return Math.floor(Math.random() * ranExpo) + min;
}

function initState() {
    return {

        playerHealth: 100,
        monsterHealth: 100,
        playerAttackDamage: 7,
        monsterAttackDamage: 8,
        playerHealValue: 4,
        randomAttack: 3,
        round: 0,
    }
}



const app = Vue.createApp({
    data() {
        return {

            playerHealth: 100,
            monsterHealth: 100,
            playerAttackDamage: 7,
            monsterAttackDamage: 8,
            playerHealValue: 4,
            randomAttack: 3,
            round: 0,
            winner: null,
            logs: [],


        }
    },
    watch: {
        playerHealth(value) {
            if (value > 100) this.playerHealth = 100;
            if (value <= 0) {
                this.playerHealth = 0;
                if (this.monsterHealth <= 0) this.winner = '平局';
                else this.winner = 'monster'
            }


        },
        monsterHealth(value) {
            if (value > 100) this.monsterHealth = 100;
            if (value <= 0) {
                this.monsterHealth = 0;
                if (this.playerHealth <= 0) this.winner = '平局';
                else this.winner = 'player'
            }
        },

        winner(value) {
            if (value !== null) {
                Object.assign(this.$data, initState());
            }
        }


    },
    computed: {
        sendMonsterHealthBar() {
            // console.log('妈妈生的')
            return { width: this.monsterHealth + '%' };
        },
        sendPlayerHealthBar() {
            // console.log('妈妈生的')
            return { width: this.playerHealth + '%' };
        },

    },
    methods: {

        logMessage(who, type, damage) {
            const msg = {
                'who': who,
                'type': type,
                'amount': damage,
            }
            this.logs.unshift(msg);
        },

        playerAttack() {
            this.round += 1;
            // console.log(this.playerHealth)
            const damage = getRandomInt(this.playerAttackDamage, this.randomAttack)
            this.logMessage('player', '攻击', damage);
            this.monsterHealth -= damage;
            this.monsterAttack();
        },
        monsterAttack() {
            const damage = getRandomInt(this.monsterAttackDamage, this.randomAttack)
            this.logMessage('monster', '攻击', damage);
            this.playerHealth -= damage;
        },

        specialAttack() {
            this.round += 1;
            const damage = getRandomInt(this.playerAttackDamage, this.randomAttack * 5)
            this.logMessage('player', '特殊攻击', damage);
            this.monsterHealth -= damage;
            this.monsterAttack();
        },

        playerHeal() {
            this.round += 1;
            const heal = getRandomInt(this.playerHealValue, 2 * this.randomAttack);
            this.logMessage('player', '治愈', heal);
            this.playerHealth += heal;
            this.monsterAttack();
        },

        restart() {
            this.log = [];
            this.winner = null;
        }


    },

}).mount('#game') 