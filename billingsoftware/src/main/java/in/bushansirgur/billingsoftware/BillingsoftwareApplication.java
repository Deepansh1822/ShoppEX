package in.bushansirgur.billingsoftware;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableJpaRepositories(basePackages = "in.bushansirgur.billingsoftware.repository")
@EntityScan(basePackages = "in.bushansirgur.billingsoftware.entity")
public class BillingsoftwareApplication {

	public static void main(String[] args) {
		SpringApplication.run(BillingsoftwareApplication.class, args);
	}

}
