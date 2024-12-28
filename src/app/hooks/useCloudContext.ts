import {useContext} from 'react';
import {CloudContext} from '../context/CloudContext.ts';

export const useCloudContext = () => useContext(CloudContext);
