const { getDb } = require('../utils/databse');

class Voters {
  constructor(voterData) {
    const { firstname, lastname, email, password, role } = voterData;
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
    this.password = password;
    this.role = role;
  }

  async save() {
    const db = getDb();
    try {
      const voterDocument = {
        firstname: this.firstname,
        lastname: this.lastname,
        email: this.email,
        password: this.password,
        role: this.role
      };
      const result = await db.collection('voters').insertOne(voterDocument);
      return result;
    } catch (error) {
      throw new Error('Failed to save voter: ' + error.message);
    }
  }

  static fetchAll() {
    const db = getDb();
    return db.collection('voters').find().toArray()
      .then(voters => {
        return voters;
      })
      .catch(err => {
        console.error('Error fetching voters:', err);
        throw err;
      });
  }

  static async findByEmail(email) {
    try {
      const db = getDb();
      
      const voter = await db.collection('voters')
        .findOne({ 
          email: { $regex: new RegExp(`^${email.trim()}$`, 'i') } 
        });
      
      return voter;
    } catch (error) {
      console.error('Error finding voter by email:', error);
      throw error; 
    }
  }
}

module.exports = Voters;