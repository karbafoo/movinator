import React from 'react';

import {Container, Table, Header} from 'semantic-ui-react';
import {useGetList} from '../hook/List';
import {RemoveFromList} from '../network/api';
import {useHistory, useParams} from 'react-router-dom';
import {Loading} from '../components/Loading';
import {Log} from '../util/logger';
const ListDetailsPage = () => {
    const history = useHistory();
    const {name} = useParams<any>();
    const [trigger, setTrigger] = React.useState<boolean>(false);
    const [list, loading, err] = useGetList(name, trigger);
    const onRemoveFromList = (movie: ListItem) => {
        if (list) {
            RemoveFromList(list.name, movie.imdb_id)
                .then((res) => {
                    setTrigger(!trigger);
                    Log('res', res);
                })
                .catch((err) => {
                    Log('err', err);
                });
        }
    };
    return (
        <Container>
            <Header color="purple">{`LIST : ${list && list.name}`}</Header>
            <div>
                <Table striped inverted>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Name</Table.HeaderCell>
                            <Table.HeaderCell width={3} textAlign="center">
                                Items
                            </Table.HeaderCell>
                            <Table.HeaderCell width={2} textAlign="center">
                                REMOVE
                            </Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {loading ? (
                            <Table.Row>
                                <Table.Cell colSpan={2} textAlign="center">
                                    <Loading />
                                </Table.Cell>
                            </Table.Row>
                        ) : null}
                        {err ? (
                            <Table.Row>
                                <Table.Cell colSpan={2} textAlign="center">
                                    <p className="error">{err.toString()}</p>
                                </Table.Cell>
                            </Table.Row>
                        ) : null}
                        {list && list.items.length === 0 ? (
                            <Table.Row>
                                <Table.Cell colSpan={2} textAlign="center">
                                    <p className="error">{'No items found.'}</p>
                                </Table.Cell>
                            </Table.Row>
                        ) : null}
                        {list &&
                            list.items.map((movie, i) => (
                                <Table.Row
                                    key={i}
                                    style={{cursor: 'pointer'}}
                                    onClick={() =>
                                        history.push(`/movie/${movie.imdb_id}`)
                                    }
                                >
                                    <Table.Cell>{movie.title}</Table.Cell>
                                    <Table.Cell width={3} textAlign="center">
                                        {movie.imdb_id}
                                    </Table.Cell>
                                    <Table.Cell
                                        width={2}
                                        textAlign="center"
                                        style={{cursor: 'pointer'}}
                                        onClick={() => onRemoveFromList(movie)}
                                    >
                                        X
                                    </Table.Cell>
                                </Table.Row>
                            ))}
                    </Table.Body>
                </Table>
            </div>
        </Container>
    );
};

export default ListDetailsPage;
