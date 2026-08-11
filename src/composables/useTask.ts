import { ref } from "vue";
import type { StudyTask } from "../types/task";

const STORAGE_KEY = 'studyflow-subjects'

const getInitialTasks = (): StudyTask[] => {
    try{
        const storedTasks = localStorage.getItem(STORAGE_KEY)

        if(!storedTasks){
            return []
        }

        return JSON.parse(storedTasks) as StudyTask[]
    } catch{
        return []
    }
}

const tasks = ref<StudyTask[]>(getInitialTasks())