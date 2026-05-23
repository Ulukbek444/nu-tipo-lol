import { useQuery } from '@tanstack/react-query';
import { Card, Flex, Spin, Alert } from 'antd';
import { pocemonsApi } from './Api/pocemonApi.js';
import cls from './pokemon.module.scss';

export default function Pokemon() {

    const { data: pokemons, isLoading, isError, error } = useQuery({
        queryKey: ['pocemons', 'list'],
        queryFn: pocemonsApi,
    });


    if (isLoading) {
        return <Flex justify="center" align="center" style={{ height: '100vh' }}><Spin size="large" /></Flex>;
    }


    if (isError) {
        return <Alert message="Ошибка загрузки" description={error.message} type="error" showIcon />;
    }


    const pokemonList = Array.isArray(pokemons) ? pokemons : [];

    return (
        <div className={cls.grid}>
            {pokemonList.map((poke) => (
                <Card className={cls.card} key={poke.id}>
                    <Flex justify="center" align="center" vertical> {/* Добавлен vertical, чтобы текст и фото не слипались */}
                        <h1 className={cls.title}>{poke.name}</h1>
                        {poke.sprites?.front_default && (
                            <img className={cls.image} src={poke.sprites.front_default} alt={poke.name} />
                        )}
                    </Flex>
                </Card>
            ))}
        </div>
    );
}
