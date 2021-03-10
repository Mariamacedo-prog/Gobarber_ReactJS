import React, { useEffect, useState } from 'react';
import 'react-day-picker/lib/style.css';
import { FiClock, FiTablet, FiArrowLeft } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import {
  Container,
  HeaderContent,
  Header,
  Content,
  Section,
  Provider,
} from './styles';
import logoImg from '../../assets/logo.svg';
import { useAuth } from '../../hooks/auth';
import api from '../../services/api';

export interface Providers {
  avatar: string;
  id: string;
  name: string;
  email: string;
}

const ListProviders: React.FC = () => {
  const { signOut, user } = useAuth();
  const [providers, setProviders] = useState<Providers[]>([]);

  useEffect(() => {
    api.get<Providers[]>('/providers').then(response => {
      setProviders(response.data);
    });
  }, []);

  return (
    <Container>
      <Header>
        <HeaderContent>
          <div>
            <Link to="/dashboard">
              <FiArrowLeft />
            </Link>
          </div>
          <div>
            <h1>Cabeleleiros</h1>
          </div>
        </HeaderContent>
      </Header>

      <Content>
        <Section>
          {providers.map(provider => (
            <Provider key={provider.id}>
              <div>
                <img
                  src={`http://localhost:3333/files/${provider.avatar}`}
                  alt={provider.name}
                />
                <span>
                  <Link className="provider" to={`/appointment/${provider.id}`}>
                    <strong>{provider.name}</strong>
                  </Link>

                  <h1>
                    <FiTablet />
                    Segunda a sexta
                  </h1>
                  <h1>
                    <FiClock />
                    8:00 até 17h00
                  </h1>
                </span>
              </div>
            </Provider>
          ))}
        </Section>
      </Content>
    </Container>
  );
};
export default ListProviders;
