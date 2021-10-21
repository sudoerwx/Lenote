import mongoose from 'mongoose';
import users from './Schema/userSchema';

/**
 * setup mongoose connection
 */
export const setUPConnection = () => {
  mongoose.connect(process?.env?.MONGODB_URI || '', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

export default { setUPConnection };
