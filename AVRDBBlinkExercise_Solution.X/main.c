#include <xc.h>

#define F_CPU 3333333
#include <util/delay.h>

int main(void)
{
    PORTB.DIR |= (1 << 3);

    while (1){
        PORTB.OUT &= ~(1 << 3);
        _delay_ms(500);
        PORTB.OUT |= (1 << 3);
        _delay_ms(500);
    }

    return 0;
}
