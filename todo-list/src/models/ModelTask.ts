export interface ModelTask{
    id: string;
    title: string;
    state: 'Todo' | 'In Progress' | 'Done';
    categorie: string;
}