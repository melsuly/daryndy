import { StyleSheet, View, Text } from 'react-native'
import {
    Table,
    TableWrapper,
    Row,
    Rows,
    Col,
    Cols,
    Cell,
} from 'react-native-table-component'
import { SafeAreaView } from 'react-native-safe-area-context'
import NavigationBar from '@components/NavigationBar'

const LessonStats = (props) => {
    const navigation = props.navigation
    const styles = createStyles()

    const tableHead = ['Оқушы', 'Нәтиже']
    const tableData = [
        ['Мэлұлы Нұрасыл', '10'],
        ['Жанат Алуа', '8'],
        ['Бақберген Мардан', '5'],
    ]

    return (
        <View>
            <SafeAreaView>
                <NavigationBar
                    title="Сабақ нәтижелері"
                    goBack={navigation.goBack}
                />
            </SafeAreaView>
            <View style={styles.horizontalContainer}>
                <Table style={styles.table} borderStyle={styles.tableBorder}>
                    <Row
                        data={tableHead}
                        style={styles.tableHead}
                        textStyle={styles.textTableCell}
                    />
                    <Rows
                        data={tableData}
                        style={styles.tableCell}
                        textStyle={styles.textTableCell}
                    />
                </Table>
            </View>
        </View>
    )
}

const createStyles = () => {
    return StyleSheet.create({
        horizontalContainer: {
            paddingHorizontal: 16,
        },

        table: {
            marginTop: 24,
        },

        tableBorder: {
            borderWidth: 1,
            borderColor: '#8E8E93',
        },

        tableHead: {
            height: 50,
        },

        tableCell: {
            height: 30,
        },

        textTableCell: {
            fontFamily: 'Regular',
            fontSize: 16,

            textAlign: 'center',
        },
    })
}

export default LessonStats
