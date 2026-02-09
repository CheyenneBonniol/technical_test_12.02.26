export default interface ModelTask {
    id: number;
    title: string;
    state: 'Todo' | 'In Progress' | 'Done';
    categorie: string;
}