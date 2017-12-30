package mains;

import entities.Person;
import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.Persistence;
import javax.persistence.Query;

public class Testing {

    public static void main(String[] args)
    {
        Persistence.generateSchema("mypu", null);
        EntityManager em = Persistence.createEntityManagerFactory("mypu").createEntityManager();
        try
        {
            Query query = em.createQuery("SELECT p FROM persons p");
            List<Person> persons = query.getResultList();
            for (Person person : persons)
            {
                System.out.println(person.getName());
            }

        } finally
        {
            em.close();
        }
    }

}
