import mongoose from 'mongoose';

export type IFile = {
  name: string;
  nameHash: string;
  ownerId: string;
  ownerName: string;
  allowedPeople: [string] | undefined[];
};

export interface IUser extends mongoose.Document {
  name: string;
  secondName: string;
  email: string;
  photoURI: string;
  ownFiles: [IFile];
  secondFiles: [IFile];
}

const file = new mongoose.Schema(
  {
    name: String,
    nameHash: String,
    ownerId: String,
    ownerName: String,
    allowedPeople: [String],
  },
  { _id: false }
);

const userSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  name: String,
  secondName: String,
  email: String,
  photoURI: String,
  ownFiles: [file],
  secondFiles: [file],
});

const User = mongoose.model<IUser>('user', userSchema);

export default User;
export { file };
