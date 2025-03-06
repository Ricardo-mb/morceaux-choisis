// const loginResolver = {
//   Mutation: {
//     login: async (_, { email, password }, context) => {
//       const user = await User.findOne({ email });
      
//       if (!user || user.accountStatus !== 'active') {
//         throw new Error('Invalid credentials');
//       }

//       const isValid = await comparePassword(password, user.password);
      
//       if (!isValid) {
//         throw new Error('Invalid credentials');
//       }

//       // Update login count
//       user.loginCount += 1;
//       await user.save();

//       const token = jwt.sign(
//         { 
//           userId: user._id,
//           role: user.role,
//           isAdmin: user.isAdmin 
//         },
//         process.env.JWT_SECRET,
//         { expiresIn: '24h' }
//       );

//       return {
//         token,
//         user: {
//           id: user._id,
//           email: user.email,
//           name: user.name,
//           role: user.role,
//           isAdmin: user.isAdmin,
//           skills: user.skills
//         }
//       };
//     }
//   }
// };
