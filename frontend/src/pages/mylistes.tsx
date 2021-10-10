import {Container, Table, Header} from 'semantic-ui-react';
import {useGetUsersLists} from '../hook/List';
import {Loading} from '../components/Loading';
import {useHistory} from 'react-router-dom';

const MyListPage = () => {
    const history = useHistory();
    const [lists, loading, err] = useGetUsersLists(false);
    return (
        <Container>
            <Header color="brown">MY LISTS</Header>
            <Table striped inverted selectable>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Name</Table.HeaderCell>
                        <Table.HeaderCell width={3} textAlign="center">
                            Items
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
                    {lists.length === 0 ? (
                        <Table.Row>
                            <Table.Cell colSpan={2} textAlign="center">
                                <p className="error">{'No lists found.'}</p>
                            </Table.Cell>
                        </Table.Row>
                    ) : null}
                    {lists.map((list, i) => {
                        console.log('list', list);
                        return (
                            <Table.Row
                                key={i}
                                style={{cursor: 'pointer'}}
                                onClick={() =>
                                    history.push(`/lists/${list.name}`)
                                }
                            >
                                <Table.Cell>{list.name}</Table.Cell>
                                <Table.Cell width={3} textAlign="center">
                                    {list.items.length}
                                </Table.Cell>
                            </Table.Row>
                        );
                    })}
                </Table.Body>
            </Table>
        </Container>
    );
};
export default MyListPage;
