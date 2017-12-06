import {hashSync, genSaltSync} from 'bcryptjs';
import { Document, Schema, Model, model } from 'mongoose';
import isEmail from '../Lib/isEmail';
import validRole from '../Lib/validRole';
// only for debugging
// import { dd } from "../Sys/Debug";

export interface IUser {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	role: string;
	rememberToken: string;
}

interface IUserModel extends IUser, Document {}

export const UserSchema: Schema = new Schema({
	firstName		: {
		type		: String,
	},
	lastName		: {
		type		: String,
	},
	email			: {
		type		: String,
		unique		: true,
		index		: true,
		trim		: true,
		lowercase	: true,
		required	: true,
		validate	: {
			validator: isEmail,
			message	: '{VALUE} is not a valid email!'
		},
	},
	password		: {
		type		: String,
		required	: true,
		trim		: true,
		select		: false,
		set			: val => hashSync(val, genSaltSync(12) ),
	},
	role			: {
		type		: String,
		trim		: true,
		lowercase	: true,
		set			: validRole,
	},
	rememberToken	: {
		type		: String,
		select		: false,
	},
},
{
	safe: true,
	timestamps: true
});

export const UserModel: Model<IUserModel> = model<IUserModel>('User', UserSchema);

