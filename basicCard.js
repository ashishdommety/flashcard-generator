function BasicCard(front,back){
  this.front = front;
  this.back = back;
}

BasicCard.prototype.showAnswer = function () {
  console.log(`the answer is ${this.back}`)
};
// NOTE: Front has question, Back has answer


module.exports = BasicCard;
