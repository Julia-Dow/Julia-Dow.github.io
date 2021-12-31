export default class PersistentStateManager {
	static loadData() {
		//save data to persistaent storage
		const lives = JSON.parse(localStorage.getItem('lives')) ?? 0; 
        const coins=JSON.parse(localStorage.getItem('coins')) ?? 0;
        const wave=JSON.parse(localStorage.getItem("wave")) ?? 1;
		const towers=JSON.parse(localStorage.getItem("towers")) ?? [];

		if (lives === 0 || wave>=10) {
			return null
		}

		return {
            lives:lives,
            coins:coins,
            wave:wave,
			towers:towers}
	}

	static addData(lives,coins,wave,towers) {
		localStorage.setItem('lives', JSON.stringify(lives));
        localStorage.setItem('coins', JSON.stringify(coins));
        localStorage.setItem('wave', JSON.stringify(wave));
		localStorage.setItem('towers',JSON.stringify(towers));
	}

	static clear(){
		localStorage.removeItem('lives');
		localStorage.removeItem('coins');
		localStorage.removeItem('wave');
		localStorage.removeItem('towers');
	}
}