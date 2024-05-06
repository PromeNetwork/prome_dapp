import create from 'zustand';

export interface TaskState {
    complete: boolean;
    setComplete: (arg0: boolean) => void;
}

export const useTaskStore = create<TaskState>((set) => ({
    complete: false,
    setComplete: (arg0: boolean) => {
        console.log("set complete", arg0)
        set((state: TaskState) => {
            console.log("zustand state", state)
            return (
                { complete: state.complete = arg0 }
            )
        })
    },
}));


