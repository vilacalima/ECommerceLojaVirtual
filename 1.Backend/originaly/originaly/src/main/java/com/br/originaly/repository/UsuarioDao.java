package com.br.originaly.repository;

import com.br.originaly.dto.UsuarioDTO;
import com.br.originaly.model.Usuario;
import java.sql.*;
import java.util.ArrayList;

public class UsuarioDao {

    /**
     * Url para consulta no banco de dados
     */
    public static String url = "jdbc:mysql://localhost:3306/originaly";

    /**
     * Login para acesso ao banco de dados
     */
    public static String login = "root";

    /**
     * Senha para acesso ao banco de dados Senha usada nos computadores do senac - > P@$$w0rd
     */
    public static String senha = "";

    /**
     * Método para salvar objetos do tipo Administrador no banco de dados
     * @param obj
     * @return
     * @throws SQLException
     */
    public static boolean salvar(UsuarioDTO obj)throws SQLException {
        Connection conexao = null;
        boolean retorno = false;

        try {

            Class.forName("com.mysql.cj.jdbc.Driver");
            conexao = DriverManager.getConnection(url,login,senha);

            PreparedStatement comandoSQL = conexao.prepareStatement("INSERT INTO usuario (nome, cpf, email, ativo, grupo) VALUES(?,?,?,?,?)");
            comandoSQL.setString(1, obj.getNome());
            comandoSQL.setString(2, obj.getCpf());
            comandoSQL.setString(3, obj.getEmail());
            comandoSQL.setBoolean(4, obj.getAtivo());
            comandoSQL.setString(5, obj.getGrupo());

            int linhasAfetadas = comandoSQL.executeUpdate();
            if(linhasAfetadas>0){
                retorno = true;
            }
        } catch (ClassNotFoundException | SQLException ex) {
            System.out.println(ex.getMessage());
        }
        return retorno;
    }

    /**
     * Método para listar objetos do tipo Administrador do banco de dados pelo cpf
     * @param obj
     * @return
     * @throws SQLException
     */
    public static ArrayList<Usuario> listarPorCpf(Usuario obj) throws SQLException{
        Connection conexao = null;
        ArrayList<Usuario> lista = new ArrayList<Usuario>();

        try{
            Class.forName("com.mysql.cj.jdbc.Driver");
            conexao = DriverManager.getConnection(url,login,senha);

            PreparedStatement comandoSQL =
                    conexao.prepareStatement("SELECT * FROM usuario WHERE cpf=?");
            comandoSQL.setString(1, obj.getCpf());

            ResultSet rs = comandoSQL.executeQuery();

            if(rs!=null){
                while(rs.next()){
                    Usuario dto = new Usuario();
                    dto.setNome(rs.getString("nome"));
                    dto.setCpf(rs.getString("cpf"));
                    dto.setEmail(rs.getString("email"));
                    dto.setAtivo(rs.getBoolean("ativo"));
                    dto.setGrupo(rs.getString("grupo"));

                    lista.add(dto);
                }
            }
        } catch (ClassNotFoundException | SQLException ex) {
            System.out.println(ex.getMessage());
        }
        return lista;
    }

    /**
     * Método para listar objetos do tipo Administrador do banco de dados
     * @param obj
     * @return
     * @throws SQLException
     */
    public static ArrayList<Usuario> listar(Usuario obj) throws SQLException{
        Connection conexao = null;
        ArrayList<Usuario> lista = new ArrayList<Usuario>();

        try{
            Class.forName("com.mysql.cj.jdbc.Driver");
            conexao = DriverManager.getConnection(url,login,senha);

            PreparedStatement comandoSQL =
                    conexao.prepareStatement("SELECT * FROM Administrador");

            ResultSet rs = comandoSQL.executeQuery();

            if(rs!=null){
                while(rs.next()){
                    Usuario dto = new Usuario();
                    dto.setNome(rs.getString("nome"));
                    dto.setCpf(rs.getString("cpf"));
                    dto.setEmail(rs.getString("email"));
                    dto.setAtivo(rs.getBoolean("ativo"));
                    dto.setGrupo(rs.getString("grupo"));

                    lista.add(dto);
                }
            }
        } catch (ClassNotFoundException | SQLException ex) {
            System.out.println(ex.getMessage());
        }
        return lista;
    }

    /**
     * Método para atualizar um Administrador no banco de dados
     * @param obj
     * @return
     */
    public static boolean atualizar(UsuarioDTO obj){
        Connection conexao = null;
        boolean retorno = false;

        try{
            Class.forName("com.mysql.cj.jdbc.Driver");
            conexao = DriverManager.getConnection(url, login, senha);

            PreparedStatement comandoSQL = conexao.prepareStatement("UPDATE usuario SET nome=?, cpf=?, email=?, ativo=?, grupo=? WHERE id=?");
            comandoSQL.setString(1, obj.getNome());
            comandoSQL.setString(2, obj.getCpf());
            comandoSQL.setString(3, obj.getEmail());
            comandoSQL.setBoolean(4, obj.getAtivo());
            comandoSQL.setString(5, obj.getGrupo());
            comandoSQL.setInt(6, obj.getId());

            int linhasAfetadas = comandoSQL.executeUpdate();
            if(linhasAfetadas>0){
                retorno = true;
            }
        } catch (ClassNotFoundException | SQLException ex) {
            System.out.println(ex.getMessage());
        }
        return retorno;
    }

    /**
     * Método para excluir um Administrador no banco de dados
     * @param id
     * @return
     */
    public static boolean excluir(int id){

        Connection conexao = null;
        boolean retorno = false;

        try {
            Class.forName("com.mysql.cj.jdbc.Driver");

            conexao = DriverManager.getConnection(url,login,senha);

            PreparedStatement comandoSQL = conexao.prepareStatement("DELETE FROM usuario WHERE id=?");
            comandoSQL.setInt(1,id);

            int linhasAfetadas = comandoSQL.executeUpdate();
            if(linhasAfetadas>0){
                retorno = true;
            }

        } catch (ClassNotFoundException ex) {
            System.out.println(ex.getMessage());
        } catch (SQLException ex) {
            System.out.println(ex.getMessage());
        }

        return retorno;
    }
}
