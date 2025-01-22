import AxiosInstance from './AxiosInstance';

// 글 전체 조회
export const fetchAllDiaries = async () => {
  try {
    const response = await AxiosInstance.get('/diary/all_read');
    return response.data.list;
  } catch (error) {
    throw error.response?.data || { message: '데이터를 불러오지 못했습니다.' };
  }
};

// 글 작성
export const createDiary = async (data) => {
  try {
    const response = await AxiosInstance.post('/diary/write', data);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: '글 작성 실패' };
  }
};

// 글 삭제
export const deleteDiary = async (id) => {
  try {
    const response = await AxiosInstance.delete('/diary/delete', { params: { _id: id } });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: '글 삭제 실패' };
  }
};