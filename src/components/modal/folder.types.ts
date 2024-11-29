export interface IFolder {
	id: number;
	name: string;
	children: IFolder[] | [];
}