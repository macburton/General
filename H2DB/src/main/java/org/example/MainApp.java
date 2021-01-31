package org.example;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.Statement;
import java.sql.*;

import org.h2.jdbcx.JdbcConnectionPool;
import org.h2.tools.Csv;

public class MainApp {

    public static void main(String[] a)
            throws Exception {
//        createDB();
        readCSV();
    }

    private static void createDB() throws SQLException {
        Connection conn = DriverManager.
                getConnection("jdbc:h2:~/test", "sa", "");
        Statement statement = conn.createStatement();
        statement.execute("CREATE TABLE TEST(ID INT, NAME VARCHAR)");
        statement.execute("INSERT INTO TEST VALUES(1, 'Hello'), (2, 'World')");
        ResultSet resultSet = statement.executeQuery("SELECT * FROM TEST");
        while (resultSet.next()) {
            long id = resultSet.getLong("ID");
            String name = resultSet.getString("NAME");
            System.out.println("id : " + id);
            System.out.println("name : " + name);
        }
        statement.execute("CALL CSVWRITE('~/test.csv', 'SELECT * FROM TEST')");
        statement.execute("DROP TABLE IF EXISTS TEST");

        conn.close();
    }

    static void readCSV() throws Exception {
        ResultSet rs = new Csv().read("~/test.csv", null, null);
        ResultSetMetaData meta = rs.getMetaData();
        while (rs.next()) {
            for (int i = 0; i < meta.getColumnCount(); i++) {
                System.out.println(
                        meta.getColumnLabel(i + 1) + ": " +
                                rs.getString(i + 1));
            }
            System.out.println();
        }
        rs.close();
    }
}

