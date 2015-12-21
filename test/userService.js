describe('UserServices', function(){

	var Users;

	beforeEach(module('userServices'));
	beforeEach(inject(function(_userService_){
		Users = _userService_;
	}));

	describe('Methods', function(){
		it('method should exist', function(){
			Users.getAll.should.be.a('function');
			Users.insertUser.should.be.a('function');
			Users.updateUser.should.be.a('function');
			Users.deleteUser.should.be.a('function');
			Users.findUser.should.be.a('function');
			Users.findUserIndex.should.be.a('function');
		})
	});
});