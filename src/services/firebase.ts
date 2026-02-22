import { db } from '@/lib/firebase';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import type { Priority, Todo } from '@/types';

const TODOS_COLLECTION = import.meta.env.VITE_FIRESTORE_COLLECTION || 'todos';

export async function fetchTodosFromDb(): Promise<Todo[]> {
    const snapshot = await getDocs(collection(db, TODOS_COLLECTION));
    return snapshot.docs.map(
        (doc) =>
            ({
                id: doc.id,
                ...doc.data()
            }) as Todo
    );
}

export async function createTodoInDb(
    title: string,
    text: string,
    priority: Priority = 'medium'
): Promise<string> {
    const docRef = await addDoc(collection(db, TODOS_COLLECTION), {
        title,
        text,
        isCompleted: false,
        createdAt: Date.now(),
        priority
    });
    return docRef.id;
}

export async function updateTodoInDb(id: string, data: Partial<Todo>): Promise<void> {
    await updateDoc(doc(db, TODOS_COLLECTION, id), data);
}

export async function deleteTodoFromDb(id: string): Promise<void> {
    await deleteDoc(doc(db, TODOS_COLLECTION, id));
}
