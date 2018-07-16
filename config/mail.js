module.exports = {
	activation(email, id){
		return {
      from: 'coffee3shop@gmail.com',
      to: email,
      subject: `Поздравляем! Аккаунт зарегистрирован.`,
      text: `Поздравляем! Аккаунт зарегистрирован. Перейдите по ссылке http://lb-front.stq.cloud/sign/activate?hash=${Math.pow(id, 2)}`
    };
	},
	sendRef(email, id){
		console.log(email, id)
		return {
      from: 'coffee3shop@gmail.com',
      to: email,
      subject: `Привет! Зайди по ссылке и получи бонус!`,
      text: `Привет! Зайди по ссылке и получи бонус! http://lb-front.stq.cloud/?ref=${Math.pow(id, 2)}`
    };		
	}
}