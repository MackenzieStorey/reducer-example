import React, { useCallback, useEffect }from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getHeroes, selectAllHeroes } from '../reducers/hero';

const HeroList = () => {
    const dispatch = useDispatch();
    const { getHeroesStatus } = useSelector(state => state.heroes);
    const heroes = useSelector(selectAllHeroes);

    const fetchData = useCallback(
        ({ pageIndex, pageSize }) => {
            const limit = pageSize;
            const offset = pageIndex * pageSize;
            const params = { limit, offset };
    
            dispatch(getHeroes(params)).catch(err => {
              console.log(err);
            });
        },
        [dispatch]
      );
    
      useEffect(() => {
        if (heroes.length === 0) {
            fetchData({ pageIndex: 1, pageSize: 10});
        }
      }, [heroes, fetchData]);

      return (
        <div>
            {getHeroesStatus.pending && (
                <p>Loading...</p>
            )}
            {getHeroesStatus.error && (
                <p>Error!</p>
            )}
            <ul>
            {heroes?.map(hero => (              
                <li>{hero.name}</li>              
            ))}
            </ul>
        </div>
      )
}

export default HeroList;