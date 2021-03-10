import React, { useEffect, useState, useCallback, useMemo } from 'react';
import 'react-day-picker/lib/style.css';
import { Link, useRouteMatch, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import DayPicker, { DayModifiers } from 'react-day-picker';
import { format } from 'date-fns';
import 'react-day-picker/lib/style.css';
import Button from '../../components/Button';
import { useToast } from '../../hooks/toast';

import {
  Container,
  HeaderTitle,
  Calendar,
  Content,
  Title,
  Schedule,
  Section,
  SectionTitle,
  SectionContent,
  Hour,
  HourTitle,
  ButtonContainer,
} from './styles';
import { useAuth } from '../../hooks/auth';
import api from '../../services/api';

interface ProviderParams {
  provider_id: string;
}

interface DayAvailabilityItem {
  hour: number;
  available: boolean;
}

interface MonthAvailabilityItem {
  date: number;
  available: boolean;
}

const CreateAppointment: React.FC = () => {
  const { addToast } = useToast();
  const [dayAvailability, setDayAvailability] = useState<DayAvailabilityItem[]>(
    [],
  );
  const [monthAvailability, setMonthAvailability] = useState<
    MonthAvailabilityItem[]
  >([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedHour, setSelectedHour] = useState(0);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const history = useHistory();

  const { params } = useRouteMatch<ProviderParams>();
  const providerId = params.provider_id;

  useEffect(() => {
    api
      .get(`/providers/${providerId}/day-availability`, {
        params: {
          year: selectedDate.getFullYear(),
          month: selectedDate.getMonth() + 1,
          date: selectedDate.getDate(),
        },
      })
      .then(response => {
        setDayAvailability(response.data);
      });
  }, [selectedDate, params.provider_id]);

  useEffect(() => {
    api
      .get(`/providers/${providerId}/month-availability`, {
        params: {
          year: currentMonth.getFullYear(),
          month: currentMonth.getMonth() + 1,
        },
      })
      .then(response => {
        setMonthAvailability(response.data);
      });
  }, [currentMonth, params.provider_id]);

  const disableDate = useMemo(() => {
    return monthAvailability
      .filter(monthDay => monthDay.available === false)
      .map(monthDay => {
        const year = currentMonth.getFullYear();
        const month = currentMonth.getMonth();

        return new Date(year, month, monthDay.date);
      });
  }, [currentMonth, monthAvailability]);

  const handleDateChange = useCallback(
    (date: Date, modifiers: DayModifiers) => {
      if (modifiers.available && !modifiers.disabled) {
        setSelectedDate(date);
      }
    },
    [],
  );

  const handleSelectHour = useCallback((hour: number) => {
    setSelectedHour(hour);
  }, []);

  const handleMonthChange = useCallback((month: Date) => {
    setCurrentMonth(month);
  }, []);

  const handleCreateAppointment = useCallback(async () => {
    try {
      const date = new Date(selectedDate);
      date.setHours(selectedHour);
      date.setMinutes(0);

      await api.post('/appointments', {
        provider_id: providerId,
        date,
      });

      history.push('/dashboard');

      addToast({
        type: 'success',
        title: 'Agendamento criado',
        description: 'Seu agendamento foi criado com sucesso',
      });
    } catch (err) {
      throw new Error('erro ao tentar criar o agendamento');
    }
  }, [selectedHour, selectedHour, providerId]);

  const morningAvailability = useMemo(() => {
    return dayAvailability
      .filter(({ hour }) => hour < 12)
      .map(({ hour, available }) => {
        return {
          hour,
          available,
          hourFormated: format(new Date().setHours(hour), 'HH:00'),
        };
      });
  }, [dayAvailability]);

  const afternoonAvailability = useMemo(() => {
    return dayAvailability
      .filter(({ hour }) => hour >= 12)
      .map(({ hour, available }) => {
        return {
          hour,
          available,
          hourFormated: format(new Date().setHours(hour), 'HH:00'),
        };
      });
  }, [dayAvailability]);

  return (
    <Container>
      <header>
        <div>
          <Link to="/providers">
            <FiArrowLeft />
          </Link>
        </div>
        <div>
          <HeaderTitle>
            <h1>Cabelereiro(a)</h1>
          </HeaderTitle>
        </div>
      </header>

      <Content>
        <Calendar>
          <Title>Escolha a data: </Title>
          <DayPicker
            weekdaysShort={['D', 'S', 'T', 'Q', 'Q', 'S', 'S']}
            fromMonth={new Date()}
            disabledDays={[{ daysOfWeek: [0, 6] }, ...disableDate]}
            modifiers={{
              available: { daysOfWeek: [1, 2, 3, 4, 5] },
            }}
            onMonthChange={handleMonthChange}
            onDayClick={handleDateChange}
            selectedDays={selectedDate}
            months={[
              'Janeiro',
              'Fevereiro',
              'Março',
              'Abril',
              'Maio',
              'Junho',
              'Julho',
              'Agosto',
              'Setembro',
              'Outubro',
              'Novembro',
              'Dezembro',
            ]}
          />
        </Calendar>

        <Schedule>
          <Title>Escolha o horário: </Title>
          <Section>
            <SectionTitle>Manhã</SectionTitle>
            <SectionContent>
              {morningAvailability.map(({ hourFormated, hour, available }) => (
                <Hour
                  disabled={!available}
                  selected={selectedHour === hour}
                  available={available}
                  key={hourFormated}
                  onClick={() => handleSelectHour(hour)}
                >
                  <HourTitle selected={selectedHour === hour}>
                    {hourFormated}
                  </HourTitle>
                </Hour>
              ))}
            </SectionContent>
          </Section>

          <Section>
            <SectionTitle>Tarde</SectionTitle>
            <SectionContent>
              {afternoonAvailability.map(
                ({ hourFormated, hour, available }) => (
                  <Hour
                    disabled={!available}
                    selected={selectedHour === hour}
                    available={available}
                    key={hourFormated}
                    onClick={() => handleSelectHour(hour)}
                  >
                    <HourTitle selected={selectedHour === hour}>
                      {hourFormated}
                    </HourTitle>
                  </Hour>
                ),
              )}
            </SectionContent>
          </Section>
        </Schedule>
      </Content>
      <ButtonContainer>
        <Button onClick={handleCreateAppointment}>Agendar</Button>
      </ButtonContainer>
    </Container>
  );
};
export default CreateAppointment;
