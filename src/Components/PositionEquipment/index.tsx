import equipmentPositionHistory from '../assets/data/equipmentPositionHistory.json'
import { Marker, Popup } from 'react-leaflet';
import { lastPosition, EquipmentStateActual, takeModelEquipment, defineIcon } from '../assets/helpers';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { TypeFilter } from '../@types';
import { setId } from '../store/equipmentId';

const PositionEquipment = () => {

    const dispatch = useDispatch()
    let filters: TypeFilter = useSelector((state: RootState)=>state.filterSlice.filter)
    return (
        <>
        {equipmentPositionHistory.map((item, index)=>(
            (filters.nome==takeModelEquipment(item.equipmentId).name || filters.nome == 'todos') &&
            (filters.situation==EquipmentStateActual(item.equipmentId)  || filters.situation == 'todos')
            ?
                (   
                
                    <Marker 
                        key={index}  
                        position={[lastPosition(item.positions).lat , lastPosition(item.positions).lon ]} 
                        icon = {defineIcon(takeModelEquipment(item.equipmentId).name)}
                        eventHandlers = {{
                            click : (e) => dispatch(setId(item.equipmentId))
                        }}
                    >

                        <Popup>
                            Nome: {takeModelEquipment(item.equipmentId).name}<br/>
                            Estado Atual:  { EquipmentStateActual(item.equipmentId) }<br/>
                        </Popup>

                    </Marker>

                ) : ''
        ))}
        </>
    )
}

export default PositionEquipment;