const TaskForm: React.FC = () => {
    return (<form>
        <div>
        <label htmlFor="title">Title</label>
            <input type='text' id='title'/>
        </div>
        <div>
        <label htmlFor="description">Description</label>
            <input type='text' id='description'/>
        </div>
        <button>Add</button>
        <button>Cancel</button>
    </form>);
};

export default TaskForm