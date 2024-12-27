import {useContext} from 'react';
import {CloudContext} from '../context/CloudContext';

export const useCloudContext = () => useContext(CloudContext);
