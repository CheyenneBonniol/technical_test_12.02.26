export default interface ModelTask {
    id: number;
    title: string;
    state: 'Todo' | 'InProgress' | 'Done';
    categorie: string;
    date: string;
}