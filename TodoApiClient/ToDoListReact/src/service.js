import axios from 'axios';
axios.defaults.baseURL = 'https://localhost:7032';

axios.interceptors.request.use(
  request => {
    console.log('Request:', request);
    return request;
  },
  error => {
    console.error('Interceptor Request Error:', error);
    return Promise.reject(error);
  }
);
// הוספת interceptor לתפיסת שגיאות ב-response ורישום ללוג
axios.interceptors.response.use(
  response => {
  console.log('Response:', response);
  return response;
  },
  error => {
    console.error('Interceptor Response Error:', error);
    return Promise.reject(error);
  }
);

export default {
  getTasks: async () => {
    const result = await axios.get(`/items`)    
    return result.data;
  },
  addTask: async(name)=>{
    console.log('addTask', name)
    try{
      const result = await axios.post(`/items`,{name});  
      return result.data;
    }catch(error){
     console.error('Error adding task:', error);
     throw error;
    }
  },

  setCompleted: async(todo, isComplete)=>{
    console.log('setCompleted', {todo, isComplete})
    try{
    const result = await axios.put(`/items/${todo.id}`,{...todo,isComplete});   
    return result.data;
    }catch (error) {
      console.error('Error setting task completion:', error);
      throw error;
    }
  },

  deleteTask:async(id)=>{
    console.log('deleteTask',id);
    try{
      const result = await axios.delete(`/items/${id}`)
      return result.data;
    }catch(error){
      console.error('Error deleting task:', error);
      throw error;
    }
  }
};
